package com.optifit.optifitbackend.service;

import com.optifit.optifitbackend.domain.Food;
import com.optifit.optifitbackend.repository.FoodRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {

    private final FoodRepository foodRepository;

    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    public Food createFood(Food food) {
        return foodRepository.save(food);
    }

    public Food updateFood(Long id, Food foodDetails) {
        return foodRepository.findById(id)
                .map(food -> {
                    food.setName(foodDetails.getName());
                    food.setCalories(foodDetails.getCalories());
                    food.setDate(foodDetails.getDate());
                    return foodRepository.save(food);
                })
                .orElseThrow(() -> new RuntimeException("Food not found"));
    }

    public void deleteFood(Long id) {
        foodRepository.deleteById(id);
    }
}
