import { line, curveLinear } from 'd3-shape';
import _ from 'lodash/fp';
import React from 'react';
import { recycleConnect } from '../recycle';

type Props = {
    data: Array<any>;
    x: Function;
    y: Function;
    xScale?: Function;
    yScale?: Function;
    color: Function;
    size: Function;
    curve: Function;
    xTransform: Function;
    yTransform: Function;
    order?: Function;
};

class Line extends React.Component<Props> {
    static defaultProps = {
        data: [],
        size: _.constant(1),
        curve: curveLinear
    };

    render() {
        const {
            data,
            x,
            y,
            xScale,
            yScale,
            color,
            size,
            curve,
            children,
            xTransform,
            yTransform,
            order
        } = this.props;

        const lineGenerator = line()
            .x(
                _.flow(
                    x,
                    xScale,
                    xTransform
                )
            )
            .y(
                _.flow(
                    y,
                    yScale,
                    yTransform
                )
            )
            .curve(curve);

        return (
            <path
                fill="none"
                stroke={color()}
                strokeWidth={size()}
                d={lineGenerator(
                    !order ? _.orderBy(x, 'asc', data) : order(data)
                )}
            />
        );
    }
}

export default recycleConnect(
    _.pick([
        'data',
        'x',
        'y',
        'xScale',
        'yScale',
        'xTransform',
        'yTransform',
        'color'
    ])
)(Line);