package com.perso.ez.debate.data.search;

import com.mysql.cj.xdevapi.Type;
import com.perso.ez.debate.persistence.DataEntity;
import com.perso.ez.debate.persistence.repositories.DataRepository;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.Sort;
import org.apache.lucene.search.SortField;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.search.FullTextQuery;
import org.hibernate.search.FullTextSession;
import org.hibernate.search.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManagerFactory;
import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    @Autowired
    private EntityManagerFactory em;

    @Autowired
    private DataRepository dataRepository;

    @GetMapping
    public Iterable<DataEntity> getAll() {
        return dataRepository.findAll();
    }

    // On autorise 1 caractère de différence avec l'occurence et 2 si la recherche est plus longue que 4 char
    private int getFuzzySize(String text) {
        return text.length() > 4 ? 2 : 1;
    }

    @GetMapping("/keyword={keyword}")
    public List<DataEntity> searchData(@PathVariable String keyword) {
        if (keyword.equals("")) {
            return null;
        }
        Session session = em.unwrap(SessionFactory.class).openSession();
        FullTextSession fullTextSession = Search.getFullTextSession(session);

        QueryBuilder qb = fullTextSession.getSearchFactory()
                .buildQueryBuilder().forEntity(DataEntity.class).get();

//        Query query = qb
//                .bool()
//                .must(qb.keyword()
//                        .fuzzy()
//                        .withEditDistanceUpTo(this.getFuzzySize(keyword))
//                        .withPrefixLength(0)
//                        .onField("tags.tag").boostedTo(10f)
//                        .andField("title").boostedTo(5f)
//                        .andField("subtitle").boostedTo(3f)
//                        .andField("text").boostedTo(1f)
//                        .matching(keyword)
//                        .createQuery())
//                .createQuery();

        Query query = qb
                .keyword()
                .fuzzy()
                .withEditDistanceUpTo(this.getFuzzySize(keyword))
                .withPrefixLength(0)
                .onField("tags.tag").boostedTo(10f)
                .andField("title").boostedTo(5f)
                .andField("subtitle").boostedTo(3f)
                .andField("text").boostedTo(1f)
                .matching(keyword)
                .createQuery();

        FullTextQuery hibQuery = fullTextSession.createFullTextQuery(query, DataEntity.class);

        List<DataEntity> result = hibQuery.list();

        session.close();
        return result;
    }

    @GetMapping("/tags={tags}&page={page}")
    public List<DataEntity> searchTags(@PathVariable String tags, @PathVariable int page) {
        Session session = em.unwrap(SessionFactory.class).openSession();
        FullTextSession fullTextSession = Search.getFullTextSession(session);

        QueryBuilder qb = fullTextSession.getSearchFactory()
                .buildQueryBuilder().forEntity(DataEntity.class).get();

        Query query = qb.keyword().onField("tags.tag").matching(tags).createQuery();

        FullTextQuery jpaQuery = fullTextSession.createFullTextQuery(query, DataEntity.class);
        Sort sort = qb.sort().byField("date").desc().createSort();
        jpaQuery.setSort(sort);
        jpaQuery.setFirstResult(3 * page);
        jpaQuery.setMaxResults(3);


        List<DataEntity> results = jpaQuery.list();
        results.forEach(result -> {
            System.out.println(result.getTitle());
        });
        session.close();
        return results;
    }
}
