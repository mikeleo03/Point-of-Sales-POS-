package com.example.fpt_midterm_pos.service;

import java.io.IOException;
import java.util.UUID;
import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.fpt_midterm_pos.dto.InvoiceDTO;
import com.example.fpt_midterm_pos.dto.InvoiceSaveDTO;
import com.example.fpt_midterm_pos.dto.InvoiceSearchCriteriaDTO;
import com.example.fpt_midterm_pos.dto.RevenueShowDTO;
import com.example.fpt_midterm_pos.exception.BadRequestException;

public interface InvoiceService {

    // Find invoices based on the provided criteria.
    Page<InvoiceDTO> findByCriteria(InvoiceSearchCriteriaDTO criteria, Pageable pageable);

    // Creating a new invoice.
    InvoiceDTO createInvoice(InvoiceSaveDTO invoiceSaveDTO);

    // Updates an existing invoice with the provided invoice details.
    InvoiceDTO updateInvoice(UUID id, InvoiceSaveDTO invoiceSaveDTO) throws BadRequestException;

    // Generates a PDF representation of the specified invoice.
    byte[] exportInvoiceToPDF(UUID id) throws IOException;

    // Retrieves the total revenue for a given date, month, or year based on the provided revenueBy parameter.
    RevenueShowDTO getInvoicesRevenue(Date date, String revenueBy);
}