package com.perso.ez.debate.data;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.io.IOException;

@Converter(autoApply = true)
public class JpaTagConverterJson implements AttributeConverter<TagLightEntity, String> {

    private final static ObjectMapper objectMapper = new ObjectMapper();
    @Override
    public String convertToDatabaseColumn(TagLightEntity o) {
        if (o != null) {
            System.out.println("----------------------------------------------- on cast " + "{id: " + o.getId() + ", tag: " + o.getTag() + "}");
            return "{id: " + o.getId() + ", tag: " + o.getTag() + "}";
        }
        return null;
    }

    @Override
    public TagLightEntity convertToEntityAttribute(String s) {
        try {
            return objectMapper.readValue(s, TagLightEntity.class);
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return null;
    }
}
