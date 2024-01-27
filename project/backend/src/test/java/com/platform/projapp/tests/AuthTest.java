package com.platform.projapp.tests;

import com.platform.projapp.ProjappApplication;
import com.platform.projapp.model.AccessRole;
import com.platform.projapp.model.User;
import org.hamcrest.core.IsNot;
import org.hamcrest.text.IsEmptyString;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.support.TransactionTemplate;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = ProjappApplication.class)
public class AuthTest {
    @Autowired
    private MockMvc mvc;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TransactionTemplate transactionTemplate;

    @BeforeEach
    public void initDefaultUser() {
        var user = User.builder().email("1").name("1")
                .passwordHash(passwordEncoder.encode("1"))
                .role(AccessRole.ROLE_CLIENT).build();
        transactionTemplate.execute(t -> entityManager.merge(user));
    }

    @Test
    @DisplayName("Should return token")
    public void returnTokenTest() throws Exception {
        mvc.perform(post("/api/auth/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"login\": \"1\",\"password\": \"1\"}"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.accessToken", IsNot.not(IsEmptyString.emptyOrNullString())));
    }
}
