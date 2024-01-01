package itmo.web.lab3.validator;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

/**
 * @author Romariok on 21.11.2023
 */
@FacesValidator("validatorX")
public class ValidatorX implements Validator {
    private static final float MAX_X = 4;
    private static final float MIN_X = -4;

    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object o) throws ValidatorException {
        if (o == null) {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                            "Поле X не может быть пустым!"));
        }
        double x = Double.parseDouble(String.valueOf(o));
        if (x < MIN_X || x > MAX_X) throw new ValidatorException(
                new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                        String.format("Значение X должно находиться в отрезке [%s ... %s].", MIN_X, MAX_X))
        );
    }
}