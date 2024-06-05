import PropTypes from 'prop-types'

const DynamicTittle = ({heading,subHeading}) => {
    return (
        <div className="w-[60%] mx-auto text-center my-5 md:my-10">
            <p className="text-[#181ed5] text-xl">---  {subHeading} ---</p>
            <div className="divider divider-info"></div>
            <h1 className="text-3xl font-semibold">{heading}</h1>
        </div>
    );
};
DynamicTittle.propTypes={
    heading:PropTypes.string,
    subHeading:PropTypes.string,
}
export default DynamicTittle;