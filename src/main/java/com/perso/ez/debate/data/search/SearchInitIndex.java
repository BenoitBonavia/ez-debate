package com.perso.ez.debate.data.search;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class SearchInitIndex {

    @Autowired
    private SearchService searchService;

    @EventListener(ContextRefreshedEvent.class) SearchService hibernateSearchService() throws InterruptedException {
        searchService.indexAllData();
        return searchService;
    }
}
