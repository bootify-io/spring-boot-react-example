package io.bootify.react.config;

import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@Configuration
@EntityScan("io.bootify.react")
@EnableJpaRepositories("io.bootify.react")
@EnableTransactionManagement
public class DomainConfig {
}
