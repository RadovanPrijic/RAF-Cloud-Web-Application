package rs.raf.demo.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import rs.raf.demo.filters.JwtFilter;
import rs.raf.demo.services.UserService;

@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserService userService;
    private final JwtFilter jwtFilter;

    @Autowired
    public SpringSecurityConfig(UserService userService, JwtFilter jwtFilter) {
        this.userService = userService;
        this.jwtFilter = jwtFilter;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(this.userService);
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {

        httpSecurity
                .cors()
                .and()
                .csrf()
                .disable()
                .authorizeRequests()
                .antMatchers("/auth/**").permitAll()
                .antMatchers("/api/users/read/**").hasAuthority("CAN_READ_USERS")
                .antMatchers("/api/users/create").hasAuthority("CAN_CREATE_USERS")
                .antMatchers("/api/users/update").hasAuthority("CAN_UPDATE_USERS")
                .antMatchers("/api/users/delete/**").hasAuthority("CAN_DELETE_USERS")
                .antMatchers("/api/machines/read/**").hasAuthority("CAN_SEARCH_MACHINES")
                .antMatchers("/api/machines/start/**").hasAuthority("CAN_START_MACHINES")
                .antMatchers("/api/machines/stop/**").hasAuthority("CAN_STOP_MACHINES")
                .antMatchers("/api/machines/restart/**").hasAuthority("CAN_RESTART_MACHINES")
                .antMatchers("/api/machines/create").hasAuthority("CAN_CREATE_MACHINES")
                .antMatchers("/api/machines/schedule").hasAuthority("CAN_SCHEDULE_MACHINES")
                .antMatchers("/api/machines/delete/**").hasAuthority("CAN_DESTROY_MACHINES")
                .anyRequest().authenticated()
                .and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        httpSecurity.addFilterBefore(this.jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManager();
    }
}
