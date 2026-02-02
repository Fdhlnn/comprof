<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Events extends Model
{

    protected $fillable = [
        'name',
        'description',
        'content',
        'image',
        'start_date',
        'end_date',
        'location',
        'status',
    ];
    protected $table = 'events';
}
