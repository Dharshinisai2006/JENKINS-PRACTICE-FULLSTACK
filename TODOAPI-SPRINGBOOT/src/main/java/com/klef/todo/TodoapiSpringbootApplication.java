package com.klef.todo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class TodoapiSpringbootApplication  extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(TodoapiSpringbootApplication.class, args);
		System.out.println("Practice project is Running ...");
	}

}
