package com.windows33.cavendish.domain.quotation.repository;

import com.windows33.cavendish.domain.quotation.entity.Quotation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuotationRepository extends JpaRepository<Quotation, Long> {

    Optional<Quotation> findById(Integer quotationId);

}
