package com.optifit.optifitbackend.dto;

import java.time.LocalDate;

public record FoodDto(
        Long id,
        String name,
        Integer calories,
        LocalDate date) {
}
