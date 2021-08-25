import React, { Component } from 'react';
import FormField from '../Forms/FormField'

export class FormExchange extends Component {
    render() {
        return (
            <div>

                <form >

                    <FormField label="seller" htmlFor="seller">
                        <input 
                        name="seller"
                        value={this.state.seller}
                        onChange={this.onChange}
                        />
                    </FormField>

                </form>
                
            </div>
        )
    }
}

export default FormExchange
