package itmo.web.lab4.security.service;


import com.fasterxml.jackson.annotation.JsonIgnore;

import itmo.web.lab4.models.User;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.Objects;

/**
 * @author Romariok on 05.12.2023
 */
@AllArgsConstructor
public class AuthUserDetails implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Long id;

    private String name;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public static AuthUserDetails build(User user) {
        return new AuthUserDetails(
                user.getId(),
                user.getName(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("Default"))
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public Long getId() {
        return id;
    }


    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AuthUserDetails user = (AuthUserDetails) o;
        return Objects.equals(id, user.id);
    }
}