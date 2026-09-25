package com.modafacil.web.service;

import com.modafacil.web.model.Produto;
import java.util.List;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class CalculadoraEstoqueTest {

    private final CalculadoraEstoque calculadora =
            new CalculadoraEstoque();

    @Test
    void deveCalcularQuantidadeTotalEmEstoque() {
        Produto produto1 = new Produto();
        produto1.setQuantidade(10);

        Produto produto2 = new Produto();
        produto2.setQuantidade(25);

        Produto produto3 = new Produto();
        produto3.setQuantidade(56);

        List<Produto> produtos = List.of(
                produto1,
                produto2,
                produto3
        );

        int resultado = calculadora.calcularTotal(produtos);

        assertEquals(91, resultado);
    }

    @Test
    void deveRetornarZeroQuandoListaEstiverVazia() {
        int resultado = calculadora.calcularTotal(List.of());

        assertEquals(0, resultado);
    }

    @Test
    void deveRetornarZeroQuandoListaForNula() {
        int resultado = calculadora.calcularTotal(null);

        assertEquals(0, resultado);
    }
}