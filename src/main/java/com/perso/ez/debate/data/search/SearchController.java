package com.perso.ez.debate.data.search;

import com.perso.ez.debate.data.DataLightEntity;
import com.perso.ez.debate.data.DataLightRepository;
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
    private DataLightRepository dataLightRepository;

    @GetMapping
    public Iterable<DataLightEntity> getAll() {
        return dataLightRepository.findAll();
    }

    @GetMapping("/{text}")
    public List<DataLightEntity> searchData(@PathVariable String text) {
        Session session = em.unwrap(SessionFactory.class).openSession();
        FullTextSession fullTextSession = Search.getFullTextSession(session);

        QueryBuilder qb = fullTextSession.getSearchFactory()
                .buildQueryBuilder().forEntity(DataLightEntity.class).get();

        org.apache.lucene.search.Query query = qb
                .keyword().onField("text")
                .andField("title")
                .matching(text)
                .createQuery();

        FullTextQuery hibQuery = fullTextSession.createFullTextQuery(query, DataLightEntity.class);

        List<DataLightEntity> result = hibQuery.list();
        System.out.println(result);

        session.close();
        return result;
    }
}
