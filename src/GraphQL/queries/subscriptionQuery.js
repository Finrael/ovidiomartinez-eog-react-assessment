import { gql } from '@apollo/client';

export default gql`
subscription {
    newMeasurement {
        metric
        at
        value
        unit
    }
}`;
