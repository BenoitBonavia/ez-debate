package com.perso.ez.debate.data.search;

import com.perso.ez.debate.data.DataEntity;
import com.perso.ez.debate.data.DataRepository;
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

    @GetMapping("/{text}")
    public List searchData(@PathVariable String text) {
        Session session = em.unwrap(SessionFactory.class).openSession();
        FullTextSession fullTextSession = Search.getFullTextSession(session);

        QueryBuilder qb = fullTextSession.getSearchFactory()
                .buildQueryBuilder().forEntity(DataEntity.class).get();

        org.apache.lucene.search.Query query = qb
                .bool()
                .must(qb.keyword()
                        .fuzzy()
                        .withEditDistanceUpTo(this.getFuzzySize(text))
                        .withPrefixLength(0)
                        .onField("tags.tag").boostedTo(10f)
                        .andField("title").boostedTo(5f)
                        .andField("subtitle").boostedTo(3f)
                        .andField("text").boostedTo(1f)
                        .matching(text)
                        .createQuery())
                .createQuery();

        FullTextQuery hibQuery = fullTextSession.createFullTextQuery(query, DataEntity.class);

        List result = hibQuery.list();
//        System.out.println(result);

        session.close();
        return result;
    }
}
