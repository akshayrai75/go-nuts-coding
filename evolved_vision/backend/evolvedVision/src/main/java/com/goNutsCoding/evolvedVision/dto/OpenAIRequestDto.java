package com.goNutsCoding.evolvedVision.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class OpenAIRequestDto {
/**
 * Model to correspond with Open AI request model
 * Referenced from : https://www.baeldung.com/spring-boot-chatgpt-api-openai
 * Site: baeldung.com
 * Topic: Using OpenAI ChatGPT APIs in Spring Boot
 * */
    private String model;
    private List<OpenAIMessageDto> messages;

    public OpenAIRequestDto(String model, String prompt) {
        this.model = model;

        this.messages = new ArrayList<>();
        this.messages.add(new OpenAIMessageDto("user", prompt));
    }

}
