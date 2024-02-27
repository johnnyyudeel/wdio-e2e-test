Feature: Inventory

    @demo @smoke
    Scenario Outline: Demo Web Interactions
        Given Login to inventory web page
        Then Invetory page should list <NumberOfProducts>
        Then Validate all products have valid price


        Examples:
            | TestID    | NumberOfProducts |
            | INV_TC001 | 6                |