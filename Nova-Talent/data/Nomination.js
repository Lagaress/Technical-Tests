class Nomination
{

    constructor(userWhoNominate,emailToNominate,explanation,involvement,overall)
    {
        this.userWhoNominate = userWhoNominate 
        this.emailToNominate = emailToNominate 
        this.explanation = explanation
        this.involvement = involvement
        this.overall = overall
        this.accepted = this.isRejectedAutomatically(overall)
    }

    getUserWhoNominate()
    {
        return this.userWhoNominate
    }

    getemailToNominate()
    {
        return this.emailToNominate
    }
    
    getExplanation()
    {
        return this.explanation
    }

    getInvolvement()
    {
        return this.involvement
    }
    
    getOverall()
    {
        return this.overall
    }

    getAccepted()
    {
        return this.accepted
    }
    
    isRejectedAutomatically(overall)
    {
        return (overall >= 8)
    }

}   

module.exports = 
{
    Nomination
}