package com.example.PetRadar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class PetRadarApplication {
	public static void main(String[] args) {
		SpringApplication.run(PetRadarApplication.class, args);
	}
}
