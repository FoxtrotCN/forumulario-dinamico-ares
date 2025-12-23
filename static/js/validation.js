/**
 * Sistema de validaciones avanzadas para el formulario de clientes
 */

class FormValidator {
    constructor() {
        this.rules = {
            // Validaciones para España
            nif: /^[0-9]{8}[A-Z]$/,
            cif: /^[A-Z][0-9]{7}[A-Z0-9]$/,
            nie: /^[XYZ][0-9]{7}[A-Z]$/,
            telefono: /^(\+34|0034|34)?[6789][0-9]{8}$/,
            codigoPostal: /^[0-9]{5}$/,
            iban: /^ES[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{1}[0-9]{1}[0-9]{10}$/,
            bic: /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
        };
        
        this.messages = {
            required: 'Este campo es obligatorio',
            nif: 'Formato de NIF inválido (ej: 12345678A)',
            cif: 'Formato de CIF inválido (ej: A12345678)',
            nie: 'Formato de NIE inválido (ej: X1234567A)',
            telefono: 'Formato de teléfono inválido (ej: +34 612 345 678)',
            codigoPostal: 'El código postal debe tener 5 dígitos',
            iban: 'Formato de IBAN español inválido',
            bic: 'Formato de BIC/SWIFT inválido',
            email: 'Formato de email inválido',
            url: 'Formato de URL inválido',
            minLength: 'Debe tener al menos {min} caracteres',
            maxLength: 'No puede tener más de {max} caracteres',
            min: 'El valor mínimo es {min}',
            max: 'El valor máximo es {max}',
            pattern: 'El formato no es válido'
        };
        
        this.init();
    }
    
    init() {
        this.setupRealTimeValidation();
        this.setupCustomValidators();
    }
    
    setupRealTimeValidation() {
        document.addEventListener('input', (e) => {
            if (e.target.matches('input, select, textarea')) {
                this.validateField(e.target);
            }
        });
        
        document.addEventListener('blur', (e) => {
            if (e.target.matches('input, select, textarea')) {
                this.validateField(e.target);
            }
        });
    }
    
    setupCustomValidators() {
        // Validador de NIF/CIF/NIE
        this.addCustomValidator('documento-identidad', (value) => {
            if (!value) return true;
            
            value = value.toUpperCase().replace(/\s/g, '');
            
            if (this.rules.nif.test(value)) {
                return this.validateNIF(value);
            } else if (this.rules.cif.test(value)) {
                return this.validateCIF(value);
            } else if (this.rules.nie.test(value)) {
                return this.validateNIE(value);
            }
            
            return false;
        });
        
        // Validador de IBAN
        this.addCustomValidator('iban', (value) => {
            if (!value) return true;
            
            value = value.toUpperCase().replace(/\s/g, '');
            return this.validateIBAN(value);
        });
        
        // Validador de teléfono
        this.addCustomValidator('telefono', (value) => {
            if (!value) return true;
            
            const cleaned = value.replace(/\s/g, '');
            return this.rules.telefono.test(cleaned);
        });
    }
    
    validateField(field) {
        if (!field || field.disabled || field.readOnly) return true;
        
        const value = field.value.trim();
        const validators = this.getFieldValidators(field);
        let isValid = true;
        let errorMessage = '';
        
        // Validar cada regla
        for (const validator of validators) {
            const result = validator.validate(value, field);
            if (!result.isValid) {
                isValid = false;
                errorMessage = result.message;
                break;
            }
        }
        
        // Aplicar resultado visual
        this.applyValidationResult(field, isValid, errorMessage);
        
        return isValid;
    }
    
    getFieldValidators(field) {
        const validators = [];
        
        // Validación de campo requerido
        if (field.hasAttribute('required')) {
            validators.push({
                validate: (value) => ({
                    isValid: value.length > 0,
                    message: this.messages.required
                })
            });
        }
        
        // Validación por tipo
        if (field.type && this.rules[field.type]) {
            validators.push({
                validate: (value) => ({
                    isValid: !value || this.rules[field.type].test(value),
                    message: this.messages[field.type]
                })
            });
        }
        
        // Validación por patrón
        if (field.pattern) {
            const regex = new RegExp(field.pattern);
            validators.push({
                validate: (value) => ({
                    isValid: !value || regex.test(value),
                    message: this.messages.pattern
                })
            });
        }
        
        // Validación de longitud mínima
        if (field.minLength) {
            validators.push({
                validate: (value) => ({
                    isValid: !value || value.length >= field.minLength,
                    message: this.messages.minLength.replace('{min}', field.minLength)
                })
            });
        }
        
        // Validación de longitud máxima
        if (field.maxLength) {
            validators.push({
                validate: (value) => ({
                    isValid: value.length <= field.maxLength,
                    message: this.messages.maxLength.replace('{max}', field.maxLength)
                })
            });
        }
        
        // Validación de valor mínimo
        if (field.min && field.type === 'number') {
            validators.push({
                validate: (value) => ({
                    isValid: !value || parseFloat(value) >= parseFloat(field.min),
                    message: this.messages.min.replace('{min}', field.min)
                })
            });
        }
        
        // Validación de valor máximo
        if (field.max && field.type === 'number') {
            validators.push({
                validate: (value) => ({
                    isValid: !value || parseFloat(value) <= parseFloat(field.max),
                    message: this.messages.max.replace('{max}', field.max)
                })
            });
        }
        
        // Validaciones personalizadas por clase
        const customValidators = field.className.split(' ')
            .filter(cls => cls.startsWith('validate-'))
            .map(cls => cls.replace('validate-', ''));
            
        customValidators.forEach(validatorName => {
            if (this.customValidators[validatorName]) {
                validators.push({
                    validate: (value) => ({
                        isValid: this.customValidators[validatorName](value),
                        message: this.messages[validatorName] || 'Valor inválido'
                    })
                });
            }
        });
        
        return validators;
    }
    
    applyValidationResult(field, isValid, errorMessage) {
        // Remover clases anteriores
        field.classList.remove('is-valid', 'is-invalid');
        
        // Aplicar nueva clase
        if (field.value.trim()) {
            field.classList.add(isValid ? 'is-valid' : 'is-invalid');
        }
        
        // Manejar mensaje de error
        this.updateErrorMessage(field, isValid ? '' : errorMessage);
        
        // Actualizar indicador visual en el sidebar si es necesario
        this.updateStepIndicator(field, isValid);
    }
    
    updateErrorMessage(field, message) {
        let errorElement = field.parentNode.querySelector('.invalid-feedback');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'invalid-feedback';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }
    
    updateStepIndicator(field, isValid) {
        const step = field.closest('[data-step]');
        if (!step) return;
        
        const stepNumber = step.getAttribute('data-step');
        const stepItem = document.querySelector(`.step-item[data-step="${stepNumber}"]`);
        
        if (stepItem) {
            // Lógica para actualizar indicador del paso
            const allFieldsValid = this.validateStep(parseInt(stepNumber));
            stepItem.classList.toggle('step-valid', allFieldsValid);
        }
    }
    
    validateStep(stepNumber) {
        const stepElement = document.querySelector(`[data-step="${stepNumber}"]`);
        if (!stepElement) return true;
        
        const fields = stepElement.querySelectorAll('input, select, textarea');
        let allValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                allValid = false;
            }
        });
        
        return allValid;
    }
    
    validateAllSteps() {
        const results = {};
        
        for (let i = 1; i <= 6; i++) {
            results[i] = this.validateStep(i);
        }
        
        return results;
    }
    
    // Validadores específicos para documentos españoles
    validateNIF(nif) {
        const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
        const number = nif.substring(0, 8);
        const letter = nif.charAt(8);
        
        return letters.charAt(number % 23) === letter;
    }
    
    validateCIF(cif) {
        const organizationTypes = 'ABCDEFGHJNPQRSUVW';
        const controlDigits = 'JABCDEFGHI';
        
        if (!organizationTypes.includes(cif.charAt(0))) return false;
        
        const number = cif.substring(1, 8);
        let sum = 0;
        
        for (let i = 0; i < number.length; i++) {
            const digit = parseInt(number.charAt(i));
            if (i % 2 === 0) {
                const doubled = digit * 2;
                sum += doubled > 9 ? doubled - 9 : doubled;
            } else {
                sum += digit;
            }
        }
        
        const controlDigit = (10 - (sum % 10)) % 10;
        const lastChar = cif.charAt(8);
        
        return lastChar === controlDigit.toString() || lastChar === controlDigits.charAt(controlDigit);
    }
    
    validateNIE(nie) {
        const niePrefix = { 'X': '0', 'Y': '1', 'Z': '2' };
        const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
        
        const number = niePrefix[nie.charAt(0)] + nie.substring(1, 8);
        const letter = nie.charAt(8);
        
        return letters.charAt(number % 23) === letter;
    }
    
    validateIBAN(iban) {
        if (!this.rules.iban.test(iban)) return false;
        
        // Algoritmo de validación IBAN
        const rearranged = iban.substring(4) + iban.substring(0, 4);
        let numericString = '';
        
        for (let i = 0; i < rearranged.length; i++) {
            const char = rearranged.charAt(i);
            if (char >= 'A' && char <= 'Z') {
                numericString += (char.charCodeAt(0) - 55).toString();
            } else {
                numericString += char;
            }
        }
        
        return this.mod97(numericString) === 1;
    }
    
    mod97(numericString) {
        let remainder = 0;
        for (let i = 0; i < numericString.length; i++) {
            remainder = (remainder * 10 + parseInt(numericString.charAt(i))) % 97;
        }
        return remainder;
    }
    
    // Sistema de validadores personalizados
    customValidators = {};
    
    addCustomValidator(name, validator) {
        this.customValidators[name] = validator;
    }
    
    // Formatters para mejorar UX
    setupFormatters() {
        // Formatter para IBAN
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('format-iban')) {
                this.formatIBAN(e.target);
            }
        });
        
        // Formatter para teléfono
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('format-telefono')) {
                this.formatTelefono(e.target);
            }
        });
    }
    
    formatIBAN(field) {
        let value = field.value.replace(/\s/g, '').toUpperCase();
        let formatted = '';
        
        for (let i = 0; i < value.length; i += 4) {
            if (i > 0) formatted += ' ';
            formatted += value.substring(i, i + 4);
        }
        
        field.value = formatted;
    }
    
    formatTelefono(field) {
        let value = field.value.replace(/\D/g, '');
        
        if (value.startsWith('34')) {
            value = '+' + value;
        } else if (value.length === 9) {
            value = '+34 ' + value;
        }
        
        // Formatear con espacios
        if (value.startsWith('+34')) {
            const number = value.substring(3);
            if (number.length >= 3) {
                value = '+34 ' + number.substring(0, 3);
                if (number.length >= 6) {
                    value += ' ' + number.substring(3, 6);
                    if (number.length >= 9) {
                        value += ' ' + number.substring(6, 9);
                    }
                }
            }
        }
        
        field.value = value;
    }
    
    // Método público para validar todo el formulario
    validateForm() {
        const results = this.validateAllSteps();
        const isValid = Object.values(results).every(valid => valid);
        
        if (!isValid) {
            // Encontrar el primer paso con errores
            const firstInvalidStep = Object.keys(results).find(step => !results[step]);
            if (firstInvalidStep) {
                // Navegar al paso con errores
                if (window.formularioCliente) {
                    window.formularioCliente.goToStep(parseInt(firstInvalidStep));
                }
            }
        }
        
        return {
            isValid,
            stepResults: results
        };
    }
    
    // Método para obtener errores específicos
    getFieldErrors(field) {
        const validators = this.getFieldValidators(field);
        const errors = [];
        
        validators.forEach(validator => {
            const result = validator.validate(field.value.trim(), field);
            if (!result.isValid) {
                errors.push(result.message);
            }
        });
        
        return errors;
    }
    
    // Método para limpiar validaciones
    clearValidation(field) {
        field.classList.remove('is-valid', 'is-invalid');
        const errorElement = field.parentNode.querySelector('.invalid-feedback');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
    
    // Método para mostrar resumen de errores
    showValidationSummary() {
        const results = this.validateAllSteps();
        const invalidSteps = Object.keys(results).filter(step => !results[step]);
        
        if (invalidSteps.length > 0) {
            const stepNames = [
                'Datos de la Empresa',
                'Información de Trasteros',
                'Usuarios de la Aplicación',
                'Configuración de Correo',
                'Niveles de Acceso',
                'Documentación'
            ];
            
            const errorList = invalidSteps.map(step => 
                `• ${stepNames[parseInt(step) - 1]}`
            ).join('\n');
            
            alert(`Por favor, complete los siguientes pasos:\n\n${errorList}`);
        }
        
        return invalidSteps.length === 0;
    }
}

// Inicializar validador cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    window.formValidator = new FormValidator();
    
    // Configurar formatters
    window.formValidator.setupFormatters();
    
    console.log('Sistema de validación inicializado');
});
