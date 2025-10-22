package com.example.PetRadar.auth;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AuthDTO {
    private String id;
    private String pw;
    private String hp;
}
