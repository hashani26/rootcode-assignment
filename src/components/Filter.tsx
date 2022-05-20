import { Select } from 'antd'
import { FC } from 'react'

const { Option } = Select

type Filter = {
  selectFilter: (value: string) => void;
  type: string;
  typeArr: { value: string; label: string }[];
};

export const Filter: FC<Filter> = (props) => {
    function onChange(value: string) {
        props.selectFilter(value)
    }

    return (
        <Select
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
