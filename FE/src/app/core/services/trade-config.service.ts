import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TradeConfigService {
  // TODO: replace with Airtable lookup
  readonly clients = [
    'Acme Trading Ltd',
    'Global Commodities SA',
    'Nordic Energy Partners',
    'Mediterranean Fuels BV',
  ];

  // TODO: replace with Airtable lookup
  readonly qualities = ['EN590', 'Jet A-1', 'ULSD 10ppm', 'Gasoil 0.1%'];

  // TODO: replace with Airtable lookup
  readonly tolerances = ['+/- 2%', '+/- 5%', '+/- 10%', 'Min/Max'];

  // TODO: replace with Airtable lookup
  readonly incoterms = ['FOB', 'CIF', 'DAP', 'EXW', 'FCA'];

  // TODO: replace with Airtable lookup
  readonly incotermLocations = [
    'Le Havre',
    'Rotterdam',
    'Antwerp',
    'Marseille',
    'Geneva',
    'Basel',
  ];

  // TODO: replace with Airtable lookup
  readonly indices = ['Platts CIF NWE', 'Argus CIF Med', 'ICE Gasoil', 'Dated Brent'];

  // TODO: replace with Airtable lookup
  readonly paymentTypes = ['LC', 'Open Account', 'Prepayment', 'CAD'];

  // TODO: replace with Airtable lookup
  readonly paymentTriggers = ['BL Date', 'Discharge Date', 'Invoice Date', 'Delivery Date'];

  // TODO: replace with Airtable lookup
  readonly brokers = ['ICAP', 'GFI', 'PVM', 'Marex', 'Bache'];
}
