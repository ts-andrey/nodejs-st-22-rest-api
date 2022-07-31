export interface Repository<
  DataType,
  IdType,
  FilterDTOType,
  CreateDTOType,
  UpdateDTOType,
> {
  findById(id: IdType): DataType;
  findAll(filterDTO: FilterDTOType): DataType[];
  create(createDTO: CreateDTOType): DataType;
  update(id: IdType, updateDTO: UpdateDTOType): DataType;
  delete(id: IdType): DataType;
}
