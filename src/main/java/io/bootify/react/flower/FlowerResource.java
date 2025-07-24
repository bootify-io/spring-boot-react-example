package io.bootify.react.flower;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/flowers", produces = MediaType.APPLICATION_JSON_VALUE)
public class FlowerResource {

    private final FlowerService flowerService;

    public FlowerResource(final FlowerService flowerService) {
        this.flowerService = flowerService;
    }

    @GetMapping
    public ResponseEntity<List<FlowerDTO>> getAllFlowers() {
        return ResponseEntity.ok(flowerService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FlowerDTO> getFlower(@PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(flowerService.get(id));
    }

    @PostMapping
    public ResponseEntity<Long> createFlower(@RequestBody @Valid final FlowerDTO flowerDTO) {
        final Long createdId = flowerService.create(flowerDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> updateFlower(@PathVariable(name = "id") final Long id,
            @RequestBody @Valid final FlowerDTO flowerDTO) {
        flowerService.update(id, flowerDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFlower(@PathVariable(name = "id") final Long id) {
        flowerService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
