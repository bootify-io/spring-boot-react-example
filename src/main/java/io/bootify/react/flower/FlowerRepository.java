package io.bootify.react.flower;

import org.springframework.data.jpa.repository.JpaRepository;


public interface FlowerRepository extends JpaRepository<Flower, Long> {
}
