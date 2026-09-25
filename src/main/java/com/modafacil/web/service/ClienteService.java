package com.modafacil.web.service;

import com.modafacil.web.model.Cliente;
import com.modafacil.web.repository.ClienteRepository;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.stereotype.Service;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    public Cliente buscarPorId(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() ->
                        new NoSuchElementException("Cliente não encontrado"));
    }

    public Cliente cadastrar(Cliente cliente) {
        if (clienteRepository.existsByEmail(cliente.getEmail())) {
            throw new IllegalArgumentException("E-mail já cadastrado");
        }

        return clienteRepository.save(cliente);
    }

    public Cliente atualizar(Long id, Cliente dadosAtualizados) {
        Cliente cliente = buscarPorId(id);

        boolean emailFoiAlterado =
                !cliente.getEmail().equalsIgnoreCase(dadosAtualizados.getEmail());

        if (emailFoiAlterado
                && clienteRepository.existsByEmail(dadosAtualizados.getEmail())) {
            throw new IllegalArgumentException("E-mail já cadastrado");
        }

        cliente.setNome(dadosAtualizados.getNome());
        cliente.setEmail(dadosAtualizados.getEmail());
        cliente.setTelefone(dadosAtualizados.getTelefone());
        cliente.setRua(dadosAtualizados.getRua());
        cliente.setNumero(dadosAtualizados.getNumero());
        cliente.setBairro(dadosAtualizados.getBairro());
        cliente.setCidade(dadosAtualizados.getCidade());
        cliente.setEstado(dadosAtualizados.getEstado());
        cliente.setCep(dadosAtualizados.getCep());
        cliente.setComplemento(dadosAtualizados.getComplemento());

        return clienteRepository.save(cliente);
    }

    public void excluir(Long id) {
        Cliente cliente = buscarPorId(id);
        clienteRepository.delete(cliente);
    }
}
