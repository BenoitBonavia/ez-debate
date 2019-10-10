package com.perso.ez.debate.data.search;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.search.FullTextSession;
import org.hibernate.search.Search;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManagerFactory;

@Service
public class SearchService {

    @Autowired
    private EntityManagerFactory em;

    public void indexAllData() throws InterruptedException {
        Session session = em.unwrap(SessionFactory.class).openSession();
        FullTextSession fullTextSession = Search.getFullTextSession(session);
        fullTextSession.createIndexer().startAndWait();
        session.close();
    }
}
