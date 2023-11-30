package com.goNutsCoding.evolvedVision.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OpenAIResponseDto {
    /**
     * Model to correspond with Open AI response model
     * Referenced from : https://www.baeldung.com/spring-boot-chatgpt-api-openai
     * Site: baeldung.com
     * Topic: Using OpenAI ChatGPT APIs in Spring Boot
     * */
    private List<Choice> choices;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Choice {

        private int index;
        private OpenAIMessageDto message;

    }
}
