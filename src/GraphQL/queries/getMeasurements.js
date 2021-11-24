import { gql } from '@apollo/client';

export default gql`
query getMeasurements($input: MeasurementQuery) {
    getMeasurements(input: $input) {
        metric
        at
        value
        unit
    }
}`;
