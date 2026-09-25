package com.modafacil.web.service;

import com.modafacil.web.model.Produto;
import java.util.List;
import java.util.Objects;
import org.springframework.stereotype.Service;

@Service
public class CalculadoraEstoque {

    public int calcularTotal(List<Produto> produtos) {
        if (produtos == null || produtos.isEmpty()) {
            return 0;
        }

        return produtos.stream()
                .filter(Objects::nonNull)
                .map(Produto::getQuantidade)
                .filter(Objects::nonNull)
                .mapToInt(Integer::intValue)
                .sum();
    }
}
