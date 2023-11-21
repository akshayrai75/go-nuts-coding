package com.goNutsCoding.evolvedVision.service;

import com.goNutsCoding.evolvedVision.dto.OpenAIRequestDto;
import com.goNutsCoding.evolvedVision.dto.OpenAIResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OpenAIService {
    @Qualifier("openaiRestTemplate")
    @Autowired
    private RestTemplate restTemplate;

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiUrl;

    /**
     * Summarizing PDF content in 50 words using OpenAI
     * reference: https://www.baeldung.com/spring-boot-chatgpt-api-openai
     * Site: baeldung.com
     * Topic: Using OpenAI ChatGPT APIs in Spring Boot
     * */
    public String getSummary(String content) {
        content = "summarize the following in 50 words: " + content;
        OpenAIRequestDto request = new OpenAIRequestDto(model, content);
        OpenAIResponseDto response = restTemplate.postForObject(apiUrl, request, OpenAIResponseDto.class);

        if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
            return null;
        }

        return response.getChoices().get(0).getMessage().getContent();
    }
}
