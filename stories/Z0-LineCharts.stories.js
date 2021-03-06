import * as d3 from 'd3';
import React from 'react';
import _ from 'lodash/fp';
import {
    Node,
    Map,
    XAxis,
    YAxis,
    Circles,
    Curve,
    Line,
    Area,
    Wrapper,
    CurvedArea
} from '../src';
import { scaleBand } from 'd3';

const days = d3.range(0, 10);
const labels = [
    'toto',
    'tata',
    'tutu',
    'titi',
    'tete',
    'tyty',
    'toutou',
    'kiki',
    'keke',
    'koko'
];

let data = [];
for (const day of days) {
    for (const label of labels) {
        data.push({
            day,
            label,
            value: Math.random() * 40 + 20
        });
    }
}

export default {
    title: 'Line charts'
};

export const Basic = () => (
    <div
        style={{
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            margin: 'auto'
        }}
    >
        <h3>A simple line chart</h3>
        <Wrapper>
            {({ w, h }) => (
                <Node
                    data={data}
                    by={_.groupBy(_.get('label'))}
                    x={{
                        get: 'day',
                        to: [0, w]
                    }}
                    y={{
                        get: 'value',
                        from: [0, 100],
                        to: [0, -h]
                    }}
                >
                    {groups => (
                        <>
                            <Map data={groups}>
                                <Line stroke="red" />
                                <Circles data={_.last} r={3} fill="red" />
                            </Map>
                            <XAxis label="test" />
                            <YAxis label="test" />
                        </>
                    )}
                </Node>
            )}
        </Wrapper>
    </div>
);

export const WithCurve = () => (
    <div
        style={{
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            margin: 'auto'
        }}
    >
        <h3>A curved line chart</h3>
        <Wrapper>
            {({ w, h }) => (
                <Node
                    data={data}
                    by={_.groupBy(_.get('label'))}
                    x={{
                        get: 'day',
                        to: [0, w]
                    }}
                    y={{
                        get: 'value',
                        from: [0, 100],
                        to: [0, -h]
                    }}
                >
                    {groups => (
                        <>
                            <Map data={groups}>
                                <Curve stroke="red" />
                                <Circles data={_.last} r={3} fill="red" />
                            </Map>
                            <XAxis label="test" />
                            <YAxis label="test" />
                        </>
                    )}
                </Node>
            )}
        </Wrapper>
    </div>
);

export const WithArea = () => (
    <div
        style={{
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            margin: 'auto'
        }}
    >
        <h3>Areas</h3>
        <Wrapper>
            {({ w, h }) => (
                <Node
                    data={data}
                    by={_.groupBy(_.get('label'))}
                    x={{
                        get: 'day',
                        to: [0, w]
                    }}
                    y={{ get: 'value', from: [0, 100], to: [0, -h] }}
                >
                    {groups => (
                        <>
                            <Map data={groups}>
                                <Area
                                    stroke="red"
                                    fill="red"
                                    fillOpacity="0.15"
                                />
                            </Map>
                            <XAxis label="test" />
                            <YAxis label="test" />
                        </>
                    )}
                </Node>
            )}
        </Wrapper>
    </div>
);

export const WithCurvedArea = () => (
    <div
        style={{
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            margin: 'auto'
        }}
    >
        <h3>Curved areas</h3>
        <Wrapper>
            {({ w, h }) => (
                <Node
                    data={data}
                    by={_.groupBy(_.get('label'))}
                    x={{
                        get: 'day',
                        to: [0, w]
                    }}
                    y={{
                        get: 'value',
                        from: [0, 100],
                        to: [0, -h]
                    }}
                >
                    {groups => (
                        <>
                            <Map data={groups}>
                                <CurvedArea
                                    stroke="red"
                                    fill="red"
                                    fillOpacity="0.15"
                                />
                            </Map>
                            <XAxis label="test" />
                            <YAxis label="test" />
                        </>
                    )}
                </Node>
            )}
        </Wrapper>
    </div>
);

export const WithHighlight = () => {
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '800px',
                margin: 'auto'
            }}
        >
            <h3>An highlighted line chart</h3>
            <Wrapper>
                {({ w, h }) => (
                    <Node
                        data={data}
                        by={_.flow(
                            _.groupBy(_.get('label')),
                            _.values,
                            _.partition(gl => gl[0].label === 'toto')
                        )}
                        x={{
                            get: 'day',
                            to: [0, w]
                        }}
                        y={{ get: 'value', from: [0], to: [0, -h] }}
                    >
                        {([highligted, others]) => (
                            <>
                                <Map data={others}>
                                    <Line stroke="#ccc" />
                                </Map>
                                <Map data={highligted}>
                                    <Line stroke="red" />
                                    <Circles
                                        data={_.last}
                                        fill="red"
                                        stroke="white"
                                        r={3}
                                    />
                                </Map>
                                <XAxis label="days" />
                                <YAxis label="value" />
                            </>
                        )}
                    </Node>
                )}
            </Wrapper>
        </div>
    );
};

export const JoyDivision = () => {
    const dataByLabel = _.flow(_.groupBy(_.get('label')), _.values)(data);

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '800px',
                margin: 'auto'
            }}
        >
            <h3>Joy Division</h3>
            <Wrapper height={500} origin="top">
                {({ w, h }) => {
                    const tScale = scaleBand()
                        .domain(d3.range(0, dataByLabel.length))
                        .range([0, h]);
                    const bw = tScale.bandwidth();
                    return (
                        <>
                            <Node
                                data={data}
                                x={{
                                    get: _.get('day'),
                                    to: [0, w]
                                }}
                            >
                                {d3.range(0, dataByLabel.length).map(i => {
                                    const data = dataByLabel[i];
                                    return (
                                        <g
                                            transform={`translate(0 ${tScale(
                                                i
                                            ) + bw})`}
                                            key={i}
                                        >
                                            <Node
                                                data={data}
                                                y={{
                                                    get: _.get('value'),
                                                    from: [0, 50],
                                                    to: [0, -bw]
                                                }}
                                            >
                                                <CurvedArea
                                                    fill="red"
                                                    fillOpacity={0.75}
                                                    stroke="white"
                                                />
                                            </Node>
                                        </g>
                                    );
                                })}
                                <XAxis transform={`translate(0 ${h})`} />
                            </Node>
                        </>
                    );
                }}
            </Wrapper>
        </div>
    );
};
