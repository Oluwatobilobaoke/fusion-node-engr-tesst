interface ListFilters {
    isDeleted?: boolean
    includeDeleted?: boolean
}

export interface GetAllAccountsFilters extends ListFilters {}
export interface GetAllBeneficiaryFilters extends ListFilters {}
export interface GetAllCardTransactionsFilters extends ListFilters {}
export interface GetAllTransactionsFilters extends ListFilters {}
export interface GetAllUsersFilters extends ListFilters {}
export interface GetAllVirtualAccountFilters extends ListFilters {}
