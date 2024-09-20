export const InputData = () =>{
    return(
        <Controller
            name={`${el.section}.${el.name}`}
            defaultValue={el.value}
            disabled={isDisabled}
            control={control}
            rules={{
                required: el.required ? `This Field is Required !!` : undefined,
            }}
            render={({ field }) => (
                <TextField

                    type={el.type}
                    fullWidth
                    value={field.value}
                    {...field}
                    onChange={(e) => {

                        field.onChange(e.target.value);
                        changeHandler(e.target.value, el, index);
                    }}
                    error={!!errors[el.section] && !!errors[el.section][el.name]}
                    helperText={errors[el.section] && errors[el.section][el.name] && errors[el.section][el.name].message}
                />
            )}
        />
    )
}