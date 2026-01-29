package com.optifit.optifitbackend.repository;

import com.optifit.optifitbackend.domain.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
}
