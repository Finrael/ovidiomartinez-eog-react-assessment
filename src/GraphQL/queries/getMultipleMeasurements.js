import { gql } from '@apollo/client';

export default gql`
query getMultipleMeasurements($input: [MeasurementQuery]){
    getMultipleMeasurements(input: $input){
        metric
        measurements {
            metric
            at
            value
            unit
        }
    }
}`;
