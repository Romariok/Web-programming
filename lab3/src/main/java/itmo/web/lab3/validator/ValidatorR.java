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
@FacesValidator("validatorR")
public class ValidatorR implements Validator {
    private static final float MAX_R = 3;
    private static final float MIN_R = 1;

    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object o) throws ValidatorException {
        if (o == null) {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                            "Поле R не может быть пустым!"));
        }
        double r = Double.parseDouble(String.valueOf(o));
        System.out.println(r);
        if (r < MIN_R || r > MAX_R) throw new ValidatorException(
                new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                        String.format("Значение R должно находиться в отрезке [%s ... %s].", MIN_R, MAX_R))
        );
    }
}