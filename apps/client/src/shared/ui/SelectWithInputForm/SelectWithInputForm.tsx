import type { RenderOption } from 'shared/ui/Select';
import { Select } from 'shared/ui/Select';
import { useState } from 'react';
import { RadioButton } from 'shared/ui/RadioButton';
import { FormProvider, useForm } from 'react-hook-form';
import { BudgetInput } from 'shared/ui/Input';

export type OptionConfig = {
  id: string;
  labelText: string;
  type: 'value' | 'range';
  getText: ((val: string) => string) | ((val1: string, val2: string) => string);
};

interface SelectWithInputFormProps {
  optionsConfigs: OptionConfig[];
  title: string;
  name: string;
  onClose: (formData: { name: string; selectedOptionId: string; firstValue: string; secondValue: string }) => void;
  inputMask: '$' | '%';
  error?: string;
  className?: string;
  initialOptionId?: string;
  initialFirstValue?: string;
  initialSecondValue?: string;
}

export function SelectWithInputForm(props: SelectWithInputFormProps) {
  const {
    optionsConfigs,
    title,
    name,
    onClose,
    inputMask,
    error,
    className = '',
    initialOptionId = '',
    initialFirstValue = '',
    initialSecondValue = '',
  } = props;

  const getInitialHeaderText = () => {
    const optionConfig = optionsConfigs.find((config) => config.id === initialOptionId);
    const headerText = optionConfig?.getText(initialFirstValue, initialSecondValue);

    return headerText ?? '';
  };

  const initialHeaderText = getInitialHeaderText();

  const [selectedOptionId, setSelectedOptionId] = useState<string>(initialOptionId);
  const [preselectedOptionId, setPreselectedOptionId] = useState<string>(initialOptionId);
  const [selectComponentHeaderText, setSelectComponentHeaderText] = useState<string>(initialHeaderText);
  const methods = useForm<{ firstValue: string; secondValue: string }>({
    defaultValues: {
      firstValue: initialFirstValue,
      secondValue: initialSecondValue,
    },
  });

  const isPreselected = (id: string) => id === preselectedOptionId;

  const getHeaderText = () => selectComponentHeaderText;

  const resetState = () => {
    setSelectedOptionId('');
    setPreselectedOptionId('');
    setSelectComponentHeaderText('');
    methods.reset({
      firstValue: '',
      secondValue: '',
    });
  };

  const handleOptionClick = (id: string) => {
    methods.reset({
      firstValue: '',
      secondValue: '',
    });
    setPreselectedOptionId(id);
  };

  const handleCancel = () => {
    resetState();
    onClose({
      name,
      selectedOptionId: '',
      firstValue: '',
      secondValue: '',
    });
  };

  const handleCloseSelect = () => {
    const [firstValue, secondValue] = methods.getValues(['firstValue', 'secondValue']);
    const optionConfig = optionsConfigs.find((config) => config.id === preselectedOptionId);

    if (!optionConfig) {
      return;
    }
    const isInValidValue = optionConfig.type === 'value' && !firstValue;
    const isInvalidRange = optionConfig.type === 'range' && !firstValue && !secondValue;

    if (isInValidValue || isInvalidRange) {
      resetState();

      return;
    }

    const newHeaderText = optionConfig.getText(firstValue, secondValue);

    setSelectComponentHeaderText(newHeaderText);
    setSelectedOptionId(preselectedOptionId);
    onClose({
      name,
      selectedOptionId: preselectedOptionId,
      firstValue,
      secondValue,
    });
  };

  const renderOptions: RenderOption[] = optionsConfigs.map(({ id, labelText, type }) => {
    return {
      id,
      text: getHeaderText,
      component: (
        <OptionComponent
          id={id}
          key={id}
          onClick={handleOptionClick}
          labelText={labelText}
          inputMask={inputMask}
          type={type}
          isChecked={isPreselected(id)}
        />
      ),
    };
  });

  return (
    <FormProvider {...methods}>
      <Select
        title={title}
        error={error}
        wrapperClass={className}
        dropdownClassName="max-h-max"
        listClassName="max-h-max"
        menuItemClassName="hover:bg-transparent"
        renderCustomOptions={renderOptions}
        selectedOptionId={selectedOptionId}
        onCancel={handleCancel}
        onClose={handleCloseSelect}
        closeOnSelect={false}
        isCustomScrollbar
        noOptional
        isCancel
      />
    </FormProvider>
  );
}

interface OptionComponentProps {
  id: string;
  onClick: (id: string) => void;
  labelText: string;
  type: 'value' | 'range';
  inputMask: '$' | '%';
  isChecked: boolean;
}
function OptionComponent(props: OptionComponentProps) {
  const { id, onClick, labelText, type, inputMask, isChecked } = props;
  const isPercentage = inputMask === '%';
  const suffix = isPercentage ? inputMask : '';
  const onClickHandler = () => onClick(id);

  return (
    <>
      <RadioButton
        onClick={onClickHandler}
        isChecked={isChecked}
        checkedText={labelText}
        unCheckedText={labelText}
        className="mb-2"
      />
      {isChecked &&
        (type === 'value' ? (
          <BudgetInput
            isSmall
            name="firstValue"
            placeholder=""
            thousandSeparator
            noPrefix={isPercentage}
            suffix={suffix}
          />
        ) : (
          <div className="flex items-center gap-1">
            <BudgetInput
              isSmall
              name="firstValue"
              placeholder=""
              thousandSeparator
              noPrefix={isPercentage}
              suffix={suffix}
            />
            to
            <BudgetInput
              isSmall
              name="secondValue"
              placeholder=""
              thousandSeparator
              noPrefix={isPercentage}
              suffix={suffix}
            />
          </div>
        ))}
    </>
  );
}
