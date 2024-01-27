package com.platform.projapp.service;

import com.platform.projapp.model.BilliardTable;
import com.platform.projapp.model.BilliardTypes;
import com.platform.projapp.repository.TableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TableService {
    private final TableRepository tableRepository;

    public void addTablesToClub(Map<BilliardTypes, Integer> inventory, Long clubId) {
        List<BilliardTable> tables = new ArrayList<>();
        for (var item : inventory.entrySet()) {
            for (int i = 0; i < item.getValue(); i++) {
                BilliardTable table = new BilliardTable(null, clubId, item.getKey());
                tables.add(table);
            }
        }
        tableRepository.saveAll(tables);
    }
}
