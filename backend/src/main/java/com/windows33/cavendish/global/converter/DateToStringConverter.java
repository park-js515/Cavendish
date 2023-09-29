package com.windows33.cavendish.global.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Converter
public class DateToStringConverter implements AttributeConverter<String, String> {

    @Override
    public String convertToDatabaseColumn(String attribute) {
        return attribute;
    }

    @Override
    public String convertToEntityAttribute(String dbDate) {
        StringBuilder sb = new StringBuilder();

        if(dbDate!=null) {
            SimpleDateFormat dbFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date date = null;
            try {
                date = dbFormat.parse(dbDate);
                SimpleDateFormat entityFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
                sb.append(entityFormat.format(date));
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return sb.toString();
        }

        return null;
    }

}
