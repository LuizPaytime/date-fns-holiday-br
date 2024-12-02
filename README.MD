# date-fns-holiday-br
---

O objetivo deste projeto é fornecer uma interface para trabalhar com feriados brasileiros usando date-fns

## instalar
```bash
npm i date-fns-holiday-br date-fns
```

## Funções Map
- [getNationalHolidays](README.MD#getNationalHolidays)
- [isNationalHoliday](README.MD#isNationalHoliday)
- [isWorkingDay](README.MD#isWorkingDay)
- [getNextWorkingDay](README.MD#getNextWorkingDay)
- [getFirstDayMouth](README.MD#getFirstDayMouth)
- [getPrevWorkingDay](README.MD#getPrevWorkingDay)

## Type Aliases

### Feriados Mapeados

- [x] Consciência negra
- [x] Natal
- [x] Ano novo
- [x] Corpus Christi
- [x] Carnaval
- [x] Páscoa
- [x] Outros

## Funções

### getNationalHolidays

▸ **getBankHolidays**: `Object`

> retorna todos os feriados mapeados

### isNationalHoliday

▸ **isNationalHoliday** (`date`): `Boolean`

> Valida se a data passada é um feriado

#### Parameters

| Name   | Type   |
|:-------|:-------|
| `date` | `Date` |

#### Returns

`boolean`

### isWorkingDay

▸ **isWorkingDay** (`date`): `Boolean`

> Valida se a data passa é um dia utíl

#### Parameters

| Name   | Type   |
|:-------|:-------|
| `date` | `Date` |

#### Returns

`boolean`

### getNextWorkingDay

▸ **getNextWorkingDay** (`date`): `Date`

>  Retorna a proxima data utíl

#### Parameters

| Name   | Type   |
|:-------|:-------|
| `date` | `Date` |

#### Returns

`Date`


### getFirstDayMouth

▸ **getFirstDayMouth**: `Number`

>  Retorna o primeiro dia do mes (MEME) // YOU

#### Parameters

| Name   | Type   |
|:-------|:-------|
| `date` | `Date` |

#### Returns

`number`

### getPrevWorkingDay

▸ **getLastWorkingDay** (`date`): `Date`

>  Retorna a primeiro dia util antes da data informada.

#### Parameters

| Name   | Type   |
|:-------|:-------|
| `date` | `Date` |

#### Returns

`Date`