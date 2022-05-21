import { Select } from 'antd'
import { FC } from 'react'
import './filter.scss'

const { Option } = Select

type Filter = {
  selectFilter: (value: string) => void;
  type: string;
  value?: string | null;
  typeArr: { value: string; label: string }[];
};

export const Filter: FC<Filter> = (props) => {
    function onChange(value: string) {
        console.log('value', value)
        
        props.selectFilter(value)
    }

    return (
        <Select
            value={props.value}
            placeholder={`Select ${props.type}`}
            optionFilterProp="children"
            onChange={onChange}
        >
            {props.typeArr.map((type) => {
                return (
                    <Option key={type.value} value={type.value}>
                        {type.label}
                    </Option>
                )
            })}
        </Select>
    )
}
