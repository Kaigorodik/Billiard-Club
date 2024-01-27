package com.platform.projapp.configuration;

import com.platform.projapp.property.SwaggerProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;

@EnableSwagger2
@Configuration
public class SwaggerDocConfig {

    private final SwaggerProperties swaggerProperties;

    @Autowired
    public SwaggerDocConfig(SwaggerProperties swaggerProperties) {
        this.swaggerProperties = swaggerProperties;
    }

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.OAS_30)
            .host(swaggerProperties.getHost())
            .select()
            .apis(RequestHandlerSelectors.basePackage("com.platform.projapp.controller"))
            .paths(PathSelectors.any())
            .build()
            .useDefaultResponseMessages(false)
            .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() {
        return new ApiInfo("Customs REST API",
            "Сервис аналитики шлюза",
            "API TOS", "Terms of service",
            new Contact("", "", ""),
            "License of API", "API license URL", Collections.emptyList());
    }
}
