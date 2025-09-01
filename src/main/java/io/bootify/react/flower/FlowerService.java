package io.bootify.react.flower;

import io.bootify.react.util.NotFoundException;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class FlowerService {

    private final FlowerRepository flowerRepository;

    public FlowerService(final FlowerRepository flowerRepository) {
        this.flowerRepository = flowerRepository;
    }

    public List<FlowerDTO> findAll() {
        final List<Flower> flowers = flowerRepository.findAll(Sort.by("id"));
        return flowers.stream()
                .map(flower -> mapToDTO(flower, new FlowerDTO()))
                .toList();
    }

    public FlowerDTO get(final Long id) {
        return flowerRepository.findById(id)
                .map(flower -> mapToDTO(flower, new FlowerDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final FlowerDTO flowerDTO) {
        final Flower flower = new Flower();
        mapToEntity(flowerDTO, flower);
        return flowerRepository.save(flower).getId();
    }

    public void update(final Long id, final FlowerDTO flowerDTO) {
        final Flower flower = flowerRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(flowerDTO, flower);
        flowerRepository.save(flower);
    }

    public void delete(final Long id) {
        final Flower flower = flowerRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        flowerRepository.delete(flower);
    }

    private FlowerDTO mapToDTO(final Flower flower, final FlowerDTO flowerDTO) {
        flowerDTO.setId(flower.getId());
        flowerDTO.setName(flower.getName());
        flowerDTO.setPrice(flower.getPrice());
        return flowerDTO;
    }

    private Flower mapToEntity(final FlowerDTO flowerDTO, final Flower flower) {
        flower.setName(flowerDTO.getName());
        flower.setPrice(flowerDTO.getPrice());
        return flower;
    }

}
