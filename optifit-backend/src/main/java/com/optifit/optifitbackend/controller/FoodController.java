package com.optifit.optifitbackend.controller;

import com.optifit.optifitbackend.domain.Food;
import com.optifit.optifitbackend.service.FoodService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@CrossOrigin(origins = "http://localhost:5173")
public class FoodController {

    private final FoodService foodService;

    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @GetMapping
    public List<Food> getAllFoods() {
        return foodService.getAllFoods();
    }

    @PostMapping
    public Food createFood(@RequestBody Food food) {
        return foodService.createFood(food);
    }

    @PutMapping("/{id}")
    public Food updateFood(@PathVariable Long id, @RequestBody Food food) {
        return foodService.updateFood(id, food);
    }

    @DeleteMapping("/{id}")
    public void deleteFood(@PathVariable Long id) {
        foodService.deleteFood(id);
    }
}
