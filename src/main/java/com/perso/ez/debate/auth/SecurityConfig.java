package com.perso.ez.debate.auth;

import com.perso.ez.debate.auth.handler.RESTAuthenticationEntryPoint;
import com.perso.ez.debate.auth.handler.RESTAuthenticationFailureHandler;
import com.perso.ez.debate.auth.handler.RESTAuthenticationSuccessHandler;
import com.perso.ez.debate.auth.handler.RESTLogoutSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private static final int REMEMBER_ME_DURATION = 60 * 60 * 24 * 30;

    @Autowired
    DataSource dataSource;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private RESTAuthenticationSuccessHandler authenticationSuccessHandler;

    @Autowired
    private RESTAuthenticationFailureHandler authenticationFailureHandler;

    @Autowired
    private RESTLogoutSuccessHandler logoutSuccessHandler;

    @Autowired
    private RESTAuthenticationEntryPoint authenticationEntryPoint;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/authentication/**").permitAll()
                .antMatchers("/api/**").authenticated().and().formLogin()
                .loginPage("/api/login").successHandler(authenticationSuccessHandler).failureHandler(authenticationFailureHandler).and()
                .logout().logoutUrl("/api/logout").logoutSuccessHandler(logoutSuccessHandler).and()
                .exceptionHandling().authenticationEntryPoint(authenticationEntryPoint);
        http.headers().frameOptions().disable();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(encoder());
    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }
}
