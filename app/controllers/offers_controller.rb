class OffersController < ApplicationController
  def index
    @offers = Offer.all
  end

  # Control logic for create-view
  # GET /offers/new
  def new
    # build a 'temporary' post which is written to DB later (create-method)
    @offer = Offer.new
  end

  # Control logic when creating a new offer
  # POST /offers
  def create
    @offer = Offer.new(offer_params)
    @subsubproject = Subsubproject.find(@offer.subsubproject_id)
    projectid = @subsubproject.subproject.project.id
    subprojectid = @subsubproject.subproject.id
    subsubprojectid = @subsubproject.id
    # write offer to database
    if @offer.save
      offert_hash = Grobengineering.offert_hash(@offer.subsubproject)
      offert_hash.each do |key, array|
        offerOffertpositionEntry = OfferOffertposition.new
        offerOffertpositionEntry.offer_id = @offer.id
        offerOffertpositionEntry.offertposition_id = key
        offerOffertpositionEntry.device_anzahl = array["device_anzahl"]
        offerOffertpositionEntry.eng_elplanung = array["kosten_eng_elplanung_total"]
        offerOffertpositionEntry.eng_planung_sw = array["kosten_eng_planung_sw_total"]
        offerOffertpositionEntry.eng_ibn_bauleitung = array["kosten_eng_ibn_bauleitung_total"]
        offerOffertpositionEntry.sps_total_brutto = array["kosten_sps_total_brutto"]
        offerOffertpositionEntry.sps_total_netto = array["kosten_sps_total_netto"]
        offerOffertpositionEntry.sch_total_brutto = array["kosten_sch_total_brutto"]
        offerOffertpositionEntry.sch_total_netto = array["kosten_sch_total_netto"]
        offerOffertpositionEntry.elinst_total_brutto = array["kosten_elinst_total_brutto"]
        offerOffertpositionEntry.elinst_total_netto = array["kosten_elinst_total_netto"]
        offerOffertpositionEntry.save!
      end
      redirect_to offerte_path(:project_id => projectid,
                               :subproject_id => subprojectid,
                               :subsubproject_id => subsubprojectid), :notice => 'Offerte erfolgreich erstellt.'
    else
      #render new_project_subproject_offer_path(@offer.subproject.project, @offer.subproject, @offer)
      render 'new'
    end
  end

  # Control logic for show-view
  # GET /offers/:id
  def show
    @offer = Offer.find(params[:id])
  end

  # Control logic for edit-view
  # GET /offers/:id/edit
  def edit
    @offer = Offer.find(params[:id])
  end

  # Save an updated offer
  # This method is either called from the offer edit-view (GET /offers/:id/edit)
  # or the offer filter-view (GET /offers/:id/filter)
  # PUT /offers/:id
  def update
    @offer = Offer.find(params[:id])
    projectid = @offer.subsubproject.subproject.project.id
    subprojectid = @offer.subsubproject.subproject.id
    subsubprojectid = @offer.subsubproject.id
    if params[:offer][:master] == "1"

      @offer.subproject.offers.each do |otheroffer|
        if otheroffer.master
          otheroffer.master = false
          otheroffer.save!
        end
      end
    end
    if @offer.update(offer_params)
      redirect_to offerte_path(:project_id => projectid,
                               :subproject_id => subprojectid,
                               :subsubproject_id => subsubprojectid),
                  :notice => 'Offerte erfolgreich aktualisiert.'
    else
      render 'edit'
    end
  end

  # Delete a offer
  # DELETE /offers/:id
  def destroy
    @offer = Offer.find(params[:id])
    projectid = @offer.subsubproject.subproject.project.id
    subprojectid = @offer.subsubproject.subproject.id
    subsubprojectid = @offer.subsubproject.id
    @offer.destroy
    redirect_to offerte_path(:project_id => projectid,
                             :subproject_id => subprojectid,
                             :subsubproject_id => subsubprojectid), :notice => 'Offerte wurde gelöscht.'
  end

  private
  # defines which parameters have to be provided by the form when creating a new offer
  def offer_params
    params.require(:offer).permit!
  end
end