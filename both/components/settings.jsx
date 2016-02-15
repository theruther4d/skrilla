Settings = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        var data = {};
        var handle = Meteor.subscribe( 'userSettings' );

        if( handle.ready() ) {
            data.settings = UserSettings.findOne();
        }

        return data;
    },
    updateSetting( name, e ) {
        var setting = {
            name: name,
            value: e.target.type == "checkbox" ? e.target.checked : e.target.value
        };

        Meteor.call( 'updateSetting', setting );
    },
    showIncomeSubItems() {
        if( this.data.settings.showIncome ) {
            return (
                <span key="incomeItems" className="income-transition">
                    <li className="settings__item settings--currency delimeter">
                        <label htmlFor="currency" className="settings__item__label" htmlFor="currency">Currency</label>
                        <select id="currency" name="currency" value={this.data.settings.currency} onChange={this.updateSetting.bind( this, "currency" )}>
                            <option value="$">USD ($)</option>
                            <option value="€">Euro (€)</option>
                        </select>
                        <label htmlFor="currency" className="more-icon">
                            <svg className="more-icon__svg" width="9" height="15" viewBox="0 0 9 15">
                                <path d="M1,15c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l6.2-5.8L0.3,1.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l7,6.5
                            C8.9,7,9,7.2,9,7.5C9,7.8,8.9,8,8.7,8.2l-7,6.5C1.5,14.9,1.2,15,1,15z"/>
                            </svg>
                        </label>
                    </li>
                    <li className="settings__item settings--salary">
                        <Incrementer
                            name="baseSalary"
                            defaultValue={this.data.settings.baseSalary}
                            currency={this.data.settings.currency}
                        />
                    </li>
                </span>
            );
        }
    },
    showSettings() {
        if( this.props.settingsOpen ) {
            return this.data.settings ? (
                <span>
                <div className="settings__modal" onClick={this.props.toggleSettings}></div>
                <ul className="settings" key={1}>
                    <li className="settings__item">
                        <RadioGroup
                            className="color-scheme"
                            action={this.props.setColorScheme}
                            current={this.props.current}
                            items={{
                                "light": "light",
                                "sepia": "sepia",
                                "medium": "medium",
                                "dark": "dark"
                            }}
                        />
                    </li>
                    <ul className="settings__group">
                        <li className="settings__item settings--income delimeter">
                            <label className="settings__item__label" htmlFor="showIncome">Show income</label>
                            <input
                                id="showIncome"
                                name="showIncome"
                                type="checkbox"
                                className="checkbox-input"
                                defaultChecked={this.data.settings.showIncome}
                                onChange={this.updateSetting.bind( this, "showIncome" )}
                                 />
                            <label htmlFor="showIncome" className="checkbox"></label>
                        </li>
                        <ReactCSSTransitionGroup
                            transitionName={{
                                enter: "setting--enter",
                                enterActive: "setting--enter--active",
                                leave: "setting--leave",
                                leaveActive: "setting--leave--active"
                            }}
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}
                            className="settings__item__exiting"
                        >
                            { this.showIncomeSubItems() }
                        </ReactCSSTransitionGroup>
                    </ul>
                    <ul className="settings__group">
                        <li className="settings__item delimeter">
                            <label className="settings__item__label">Hide Clock</label>
                            <input
                                id="checkbox-1"
                                name="checkbox-1"
                                type="checkbox"
                                className="checkbox-input"
                                 />
                            <label htmlFor="checkbox-1" className="checkbox"></label>
                        </li>
                        <li className="settings__item">
                            <label className="settings__item__label">Scrolling View</label>
                            <input
                                id="checkbox-2"
                                name="checkbox-2"
                                type="checkbox"
                                className="checkbox-input"
                                 />
                            <label htmlFor="checkbox-2" className="checkbox"></label>
                        </li>
                    </ul>
                </ul>
                </span>
            ) : ( <span></span> );
        }
    },
    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName={{
                    enter: "settings--enter",
                    enterActive: "settings--enter--active",
                    leave: "settings--leave",
                    leaveActive: "settings--leave--active"
                }}
                transitionEnterTimeout={50}
                transitionLeaveTimeout={375}
                component="div"
                className="settings--animation"
            >
                {this.showSettings()}
            </ReactCSSTransitionGroup>
        );
    }
});
